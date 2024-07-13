<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BlogService } from '@/services/api/blog.service';
import {
  type ImageUploadSuccess,
  type ImageUploadFailure,
} from '../../types/editorjs';
import { type EditorJSEmits } from './emits';
import { type EditorJSProps } from './props';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import editorJsCodeCup from '@calumk/editorjs-codecup';
import { parseBlocksToHTML, parsedHTMLToBlocks } from '../../services/parser';

const emits = defineEmits<EditorJSEmits>();
const props = defineProps<EditorJSProps>();

const editor = ref<EditorJS>();
const parsedBlocks = ref(props.contents ?? '');

const setupEditor = (): void => {
  editor.value = new EditorJS({
    holder: 'editorjs',
    placeholder: 'Type to get started',
    ...(props.contents !== '' && {
      data: {
        time: Date.now(),
        blocks: parsedHTMLToBlocks(props.contents),
      },
    }),
    tools: {
      header: Header,
      list: List,
      quote: Quote,
      code: editorJsCodeCup,
      inlineCode: {
        class: InlineCode,
      },
      image: {
        class: Image,
        config: {
          uploader: {
            async uploadByFile(file: File) {
              return BlogService.uploadImage(file)
                .then((url: string): ImageUploadSuccess => {
                  return {
                    success: 1,
                    file: {
                      url,
                    },
                  };
                })
                .catch((err): ImageUploadFailure => {
                  return {
                    success: 0,
                    message: err.message,
                  };
                });
            },
          },
        },
      },
    },
    onChange: async () => {
      await save();
    },
  });

  editor.value.isReady.then(async (): Promise<void> => {
    await save();
  });
};

const save = async (): Promise<void> => {
  const data = await editor.value?.save();
  if (!data) return;

  parsedBlocks.value = parseBlocksToHTML(data.blocks);
  emits('update:contents', parsedBlocks.value);
};

onMounted((): void => {
  setupEditor();
});
</script>

<template>
  <div id="editorjs" class="rounded-lg p-5"></div>
</template>

<style>
#editorjs {
  box-shadow: 0 -3px 29px -5px rgba(34, 39, 47, 0.14);
}
.codex-editor__redactor {
  padding-bottom: 0px !important;
}
#editorjs .ce-block__content {
  background: rgb(240, 240, 240);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.codecup--has-line-numbers .codecup__flatten {
  left: 55px !important;
}
</style>

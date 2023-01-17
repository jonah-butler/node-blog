<template>
  <div>
    <div id="editorjs"></div>
    <!-- <section class="post" v-html="parsedBlocks"></section> -->
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import InlineCode from '@editorjs/inline-code';
import CodeBox from '@bomdi/codebox';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import BlogServices from '@/services/BlogServices';
import helpers from '@/helpers/parser';

export default {
  props: {
    contents: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      parsedBlocks: '',
    };
  },
  mounted() {
    console.log('contents: ', this.contents);
    this.editor = new EditorJS({
      holder: 'editorjs',
      ...(this.contents !== '') && {
        data: {
          time: Date.now(),
          blocks: helpers.parseHTMLToBlocks(this.contents),
        },
      },
      tools: {
        codeBox: {
          class: CodeBox,
          config: {
            // themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
            // themeName: 'atom-one-dark', // Optional
          },
        },
        header: Header,
        list: List,
        quote: Quote,
        inlineCode: {
          class: InlineCode,
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                return BlogServices.uploadImage(file)
                  .then((resp) => {
                    if (resp.status === 200) {
                      return {
                        success: 1,
                        file: {
                          url: resp.data.location,
                        },
                      };
                    }
                    return {
                      success: 0,
                    };
                  })
                  .catch((error) => {
                    console.log('image upload error: ', error);
                    return {
                      success: 0,
                    };
                  });
              },
            },
          },
        },
      },
      onChange: async () => {
        await this.save();
      },
    });
  },
  methods: {
    async save() {
      const data = await this.editor.save();
      this.parsedBlocks = helpers.parseBlocksToHTML(data.blocks);
      this.$emit('updatedContents', this.parsedBlocks);
    },
  },
};
</script>

<style>
#editorjs {
  max-width: 80%;
  margin-top: 15px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 1px 1px 20px 0px rgb(0 0 0 / 4%);
}
.ce-code__textarea {
  min-height: 100% !important;
}

.ce-block__content {
  background: #f4f5f7;
  padding: 10px;
}

.codeBoxTextArea {
  width: 97%;
}

.codeBoxSelectDiv {
  background: white;
  margin-top: 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 20px 0px rgb(0 0 0 / 4%);
}

.codeBoxSelectDropIcon {
  bottom: 4px !important;
  background-color: white !important;
}

.codeBoxSelectInput {
  background: white !important;
}

.image-tool__image-picture {
  width: 60% !important;
}
</style>

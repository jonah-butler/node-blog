import { type OutputBlockData } from '@editorjs/editorjs';
import hightlightjs, { type HighlightResult } from 'highlight.js';

const parseBlockToHeader = (block: OutputBlockData): string => {
  return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
};

const parseBlockToList = (block: OutputBlockData): string => {
  const listType = block.data.style === 'unordered' ? 'ul' : 'ol';
  let listHTML = `<${listType}>`;

  block.data.items.forEach((item: string) => {
    listHTML += `<li>${item}</li>`;
  });

  listHTML += `</${listType}>`;

  return listHTML;
};

const parseBlockToParagraph = (block: OutputBlockData): string => {
  return `<p>${block.data.text}</p>`;
};

const parseBlockToQuote = (block: OutputBlockData): string => {
  if (block.data.caption.length) {
    return `<blockquote data-caption="${block.data.caption}">${block.data.text}</blockquote>`;
  }
  return `<blockquote>${block.data.text}</blockquote>`;
};

const parseBlockToImage = (block: OutputBlockData): string => {
  if (block.data.caption.length) {
    return `<img src="${block.data.file.url}" data-caption="${block.data.caption}">`;
  }
  return `<img src="${block.data.file.url}">`;
};

const parseBlockToCode = (block: OutputBlockData): string => {
  const { language, code } = block.data;
  let highlightedResult: HighlightResult;
  if (language !== 'plain' && language) {
    highlightedResult = hightlightjs.highlight(code, {
      language,
    });
    return `<pre class="ql-syntax" data-language="${language}" spellcheck="false">${highlightedResult.value}</pre>`;
  } else {
    highlightedResult = hightlightjs.highlightAuto(code);
    return `<pre class="ql-syntax" spellcheck="false">${highlightedResult.value}</pre>`;
  }
};

const parseBlocksToHTML = (blocks: OutputBlockData[]): string => {
  let convertedHTML = '';

  blocks.forEach((block) => {
    switch (block.type) {
      case 'header':
        convertedHTML += parseBlockToHeader(block);
        break;
      case 'list':
        convertedHTML += parseBlockToList(block);
        break;
      case 'paragraph':
        convertedHTML += parseBlockToParagraph(block);
        break;
      case 'quote':
        convertedHTML += parseBlockToQuote(block);
        break;
      case 'image':
        convertedHTML += parseBlockToImage(block);
        break;
      case 'code':
        convertedHTML += parseBlockToCode(block);
        break;
      default:
        convertedHTML += '';
    }
  });

  return convertedHTML;
};

const convertNodeToParagraph = (node: Element, id: string): OutputBlockData => {
  return {
    data: {
      text: node.innerHTML,
    },
    id,
    type: 'paragraph',
  };
};

const convertNodeToCode = (node: Element, id: string): OutputBlockData => {
  const language = node.getAttribute('data-language');

  return {
    data: {
      code: (node as HTMLElement).innerText,
      language,
    },
    id,
    type: 'code',
  };
};

const convertNodeToHeader = (node: Element, id: string): OutputBlockData => {
  return {
    data: {
      text: (node as HTMLElement).innerText,
      level: node.tagName[1],
    },
    id,
    type: 'header',
  };
};

const convertNodeToQuote = (node: Element, id: string): OutputBlockData => {
  return {
    data: {
      alignment: 'left',
      caption: node.getAttribute('data-caption'),
      text: (node as HTMLElement).innerText,
    },
    id,
    type: 'quote',
  };
};

const convertNodeToList = (node: Element, id: string): OutputBlockData => {
  const nodeListItems = node.children;
  return {
    data: {
      items: Array.from(nodeListItems).map((l) => (l as HTMLElement).innerText),
      style: node.tagName === 'OL' ? 'ordered' : 'unordered',
    },
    id,
    type: 'list',
  };
};

const convertNodeToImage = (node: Element, id: string): OutputBlockData => {
  return {
    data: {
      caption: node.getAttribute('data-caption'),
      file: {
        url: node.getAttribute('src'),
      },
      stretched: false,
      withBackground: false,
      withBorder: false,
    },
    id,
    type: 'image',
  };
};

const parsedHTMLToBlocks = (htmlString: string): OutputBlockData[] => {
  const blocks: OutputBlockData[] = [];
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');
  const body = html.querySelector('body');
  const [...children] = body!.children;

  children.forEach((node, i) => {
    const index = i.toString();
    switch (node.tagName) {
      case 'P':
        blocks.push(convertNodeToParagraph(node, index));
        break;
      case 'PRE':
        blocks.push(convertNodeToCode(node, index));
        break;
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5':
      case 'H6':
        blocks.push(convertNodeToHeader(node, index));
        break;
      case 'OL':
      case 'UL':
        blocks.push(convertNodeToList(node, index));
        break;
      case 'BLOCKQUOTE':
        blocks.push(convertNodeToQuote(node, index));
        break;
      case 'IMG':
        blocks.push(convertNodeToImage(node, index));
        break;
      default:
        break;
    }
  });

  return blocks;
};

export { parseBlocksToHTML, parsedHTMLToBlocks };

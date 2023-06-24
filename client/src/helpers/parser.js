const parseBlockToHeader = (block) => `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;

const parseBlockToParagraph = (block) => `<p>${block.data.text}</p>`;

const parseBlockToList = (block) => {
  const listType = block.data.style === 'unordered' ? 'ul' : 'ol';
  let listHTML = `<${listType}>`;
  block.data.items.forEach((item) => {
    listHTML += `<li>${item}</li>`;
  });
  listHTML += `</${listType}>`;
  return listHTML;
};

const parseBlockToImage = (block) => {
  if (block.data.caption.length) {
    return `<img src="${block.data.file.url}" data-caption="${block.data.caption}">`;
  }
  return `<img src="${block.data.file.url}">`;
};

const parseBlockToCode = (block) => {
  if (block.data.language === 'Auto-detect' || block.data.language === 'none') {
    return `<pre class="ql-syntax" spellcheck="false">${block.data.code}</pre>`;
  }
  return `<pre class="ql-syntax" data-language="${block.data.language}" spellcheck="false">${block.data.code}</pre>`;
};

const parseBlockToQuote = (block) => {
  if (block.data.caption.length) {
    return `<blockquote data-caption="${block.data.caption}">${block.data.text}</blockquote>`;
  }
  return `<blockquote>${block.data.text}</blockquote>`;
};

const convertNodeToPara = (node, i) => {
  console.log('paragraph node: ', node);
  const block = {
    data: {
      text: node.innerHTML,
    },
    id: i,
    type: 'paragraph',
  };
  return block;
};

const convertNodeToCode = (node, i) => {
  const lang = node.getAttribute('data-language');
  const block = {
    data: {
      code: node.innerHTML,
      language: lang != null ? lang : 'Auto-detect',
    },
    id: i,
    type: 'codeBox',
  };
  return block;
};

const convertNodeToHeader = (node, i) => {
  const block = {
    data: {
      text: node.innerText,
      level: node.tagName[1],
    },
    id: i,
    type: 'header',
  };
  return block;
};

const convertNodeToList = (node, i) => {
  const nodeListItems = node.children;
  const block = {
    data: {
      items: Array.from(nodeListItems).map((l) => l.innerText),
      style: node.tagName === 'OL' ? 'ordered' : 'unordered',
    },
    id: i,
    type: 'list',
  };
  return block;
};

const convertNodeToBlockQuote = (node, i) => {
  const block = {
    data: {
      alignment: 'left',
      caption: node.getAttribute('data-caption'),
      text: node.innerText,
    },
    id: i,
    type: 'quote',
  };
  return block;
};

const convertNodeToImage = (node, i) => {
  const block = {
    data: {
      caption: node.getAttribute('data-caption'),
      file: {
        url: node.getAttribute('src'),
      },
      stretched: false,
      withBackground: false,
      withBorder: false,
    },
    id: i,
    type: 'image',
  };
  return block;
};

const parseBlocksToHTML = (blocks) => {
  let convertedHTML = '';
  blocks.forEach((block) => {
    switch (block.type) {
      case 'header':
        convertedHTML += parseBlockToHeader(block);
        break;
      case 'paragraph':
        convertedHTML += parseBlockToParagraph(block);
        break;
      case 'list':
        convertedHTML += parseBlockToList(block);
        break;
      case 'image':
        convertedHTML += parseBlockToImage(block);
        break;
      case 'codeBox':
        convertedHTML += parseBlockToCode(block);
        break;
      case 'quote':
        convertedHTML += parseBlockToQuote(block);
        break;
      default:
        convertedHTML += '';
        break;
    }
  });
  return convertedHTML;
};

const parseHTMLToBlocks = (text) => {
  const blocks = [];
  const parser = new DOMParser();
  const html = parser.parseFromString(text, 'text/html');
  const [...children] = html.querySelector('body').children;
  console.log(children);
  children.forEach((node, i) => {
    switch (node.tagName) {
      case 'P':
        blocks.push(convertNodeToPara(node, i));
        break;
      case 'PRE':
        blocks.push(convertNodeToCode(node, i));
        break;
      // fall-through to check for all header tags names
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5':
      case 'H6':
        blocks.push(convertNodeToHeader(node, i));
        break;
      // fall-through for both types of lists
      case 'OL':
      case 'UL':
        blocks.push(convertNodeToList(node, i));
        break;
      case 'BLOCKQUOTE':
        blocks.push(convertNodeToBlockQuote(node, i));
        break;
      case 'IMG':
        blocks.push(convertNodeToImage(node, i));
        break;
      default:
        break;
    }
  });
  return blocks;
};

export default {
  parseBlocksToHTML,
  parseHTMLToBlocks,
};

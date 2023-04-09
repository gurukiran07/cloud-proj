
const typeMap = {
    cpp: 'C/C++',
    java: 'Java',
    csv: 'CSV',
    txt: 'TEXT',
    md: 'Markdown',
    pdf: 'PDF',
}

export function replaceLast(name, type, size, cstatus, status){
    return [name, type, size, status]
}

export function fileMapping(type){
    console.log(type, 'type')
    if (type.includes('.')){
        return typeMap[type.slice(type.lastIndexOf('.')+1, type.length)]
    }
    else{
        return 'Unknown'
    }
}

export function splitFiletoChunks(str){
    return str.match(/.{1,100000}/g)
}

export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const toBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export async function filesRender(files){
    let filesList = [];
    for (const file of files) {
      await toBase64(file).then((value) => {
        console.log(value);
        filesList.push({
          data: file,
          size: file.size,
          type: fileMapping(file.name),
          name: file.name,
          base64: value.replace(/^data:(.*,)?/, ""),
          status: 'Ready to Upload'
        });
      });
    }
    return filesList;
  };

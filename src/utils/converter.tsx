export interface BoxInfoInt {
  title: string;
  color: string;
}

export function convertTitleToBoxInfo(title: number): BoxInfoInt {
  let boxinfo = {
    title: "",
    color: ""
  } as BoxInfoInt;
  boxinfo.title = title === 0 ? "" : title.toString();
  switch (title) {
    case 0:
      boxinfo.color = "#CCC0B4";
      break;
    case 2:
      boxinfo.color = "#EEE4DA";
      break;
    case 4:
      boxinfo.color = "#EDE0C8";
      break;
    case 8:
      boxinfo.color = "#F2B179";
      break;
    case 16:
      boxinfo.color = "#F59563";
      break;
    case 32:
      boxinfo.color = "#F67C5F";
      break;
    case 64:
      boxinfo.color = "#F65E3B";
      break;
    case 128:
      boxinfo.color = "#EDCF72";
      break;
    case 256:
      boxinfo.color = "#EDCC61";
      break;
    case 512:
      boxinfo.color = "#EDC850";
      break;
    case 1024:
      boxinfo.color = "#EDC53F";
      break;
    case 2048:
      boxinfo.color = "#EDC22E";
      break;
    default:
      boxinfo.color = "#000";
      break;
  }
  return boxinfo;
}

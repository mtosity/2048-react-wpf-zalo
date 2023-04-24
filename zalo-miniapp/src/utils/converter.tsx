export interface BoxInfoInt {
  title: string;
  color: string;
  titleColor: string;
  titleSize: string;
}

export function convertTitleToBoxInfo(title: number): BoxInfoInt {
  let boxinfo = {
    title: "",
    color: "",
    titleColor: "#F9F6F2",
    titleSize: "1vw"
  } as BoxInfoInt;
  boxinfo.title = title === 0 ? "" : title.toString();
  switch (title) {
    case 0:
      boxinfo.color = "#CCC0B4";
      break;
    case 2:
      boxinfo.color = "#EEE4DA";
      boxinfo.titleColor = "#776E65"
      boxinfo.titleSize = "10vmin"
      break;
    case 4:
      boxinfo.color = "#EDE0C8";
      boxinfo.titleColor = "#776E65"
      boxinfo.titleSize = "10vmin"
      break;
    case 8:
      boxinfo.color = "#F2B179";
      boxinfo.titleSize = "10vmin"
      break;
    case 16:
      boxinfo.color = "#F59563";
      boxinfo.titleSize = "9vmin"
      break;
    case 32:
      boxinfo.color = "#F67C5F";
      boxinfo.titleSize = "9vmin"
      break;
    case 64:
      boxinfo.color = "#F65E3B";
      boxinfo.titleSize = "9vmin"
      break;
    case 128:
      boxinfo.color = "#EDCF72";
      boxinfo.titleSize = "7vmin"
      break;
    case 256:
      boxinfo.color = "#EDCC61";
      boxinfo.titleSize = "7vmin"
      break;
    case 512:
      boxinfo.color = "#EDC850";
      boxinfo.titleSize = "7vmin"
      break;
    case 1024:
      boxinfo.color = "#EDC53F";
      boxinfo.titleSize = "5vmin"
      break;
    case 2048:
      boxinfo.color = "#EDC22E";
      boxinfo.titleSize = "5vmin"
      break;
    default:
      boxinfo.color = "#000";
      boxinfo.titleSize = "4vmin"
      break;
  }
  return boxinfo;
}
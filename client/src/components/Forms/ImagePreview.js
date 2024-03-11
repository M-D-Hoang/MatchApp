export function ImagePreview({src}){
  //TO-DO: Make multiple images & have 'em load side to side
  //Should have a nicer implementation later
  let imageJSX = null;
  if(src != null){
      imageJSX = <img alt="preview" src={URL.createObjectURL(src)} className="profile-image-preview"/>
  }
  return(imageJSX);
}

export function ImagePreview({src}){
  //TO-DO: Make multiple images & have 'em load side to side
  //Should have a nicer implementation later
  let imageJSX = null;
  if(src != null && src !== undefined){
    const imageArray = Array.from(src)
    let i = 0
      imageJSX = imageArray.map((img)=>{i++; return <img alt="preview" key={`preview-${i}`} src={URL.createObjectURL(img)} className="profile-image-preview"/>});
  }
  return(<div className=''>
    {imageJSX}
  </div>);
}

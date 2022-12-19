export const changeToSlug = (text) => {
  var slug = text;
  
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/, 'a');
  slug = slug.replace(/Á|À|Ả|Ạ|Ã|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ/, 'A');

  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/, 'e');
  slug = slug.replace(/É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/, 'E');

  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/, 'i');
  slug = slug.replace(/I|Í|Ì|Ỉ|Ĩ|Ị/, 'I');

  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/, 'o');
  slug = slug.replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỗ|Ợ/, 'O');

  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/, 'u');
  slug = slug.replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/, 'U');

  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/, 'y');
  slug = slug.replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/, 'Y');

  slug = slug.replace(/đ/, 'd');
  slug = slug.replace(/Đ/, 'D');
  
  return slug;
}

export const reverse = (s) => {
  return [...s].reverse().join("");
}
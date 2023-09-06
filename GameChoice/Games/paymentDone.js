if(localStorage.package == "fast"){
  document.getElementById("lol").innerHTML = "Za přibližně 1 den vám přijde E-mail, s odkazem na stažení vaší dokončené hry";
}else{
  console.log(document.getElementById("lol").innerHTML);
  document.getElementById("lol").innerHTML = "Za přibližně 5 dní vám přijde E-mail, s odkazem na stažení vaší dokončené hry";
}
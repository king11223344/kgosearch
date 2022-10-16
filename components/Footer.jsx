
function Footer() {
  const year= new Date().getFullYear()

  
  return (
    <>
      <div className=" text-center p-10 mt-10 border-t dark:border-gray-700 border-gray-200">
      
        <h1>{year} KGP Search Engine</h1>
        <h1>Made by Shashank Singhania</h1>
      </div>
    </>
  );
}
export default Footer;

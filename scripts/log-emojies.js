fs.readdirSync("./public/images/chat/pepe").map((fileName) => {
  return {
    name: fileName.replace(".png", ""),
    image: `/images/chat/pepe/${fileName}`,
  };
});

const dummyData = [
  {
    id: +new Date(),
    title: "Note 1",
    body: "This is the body content for note 1.",
    createdAt: new Date().toISOString(),
  },
  {
    id: +new Date() + 1,
    title: "Note 2",
    body: "This is the body content for note 2.",
    createdAt: new Date().toISOString(),
  },
  {
    id: +new Date() + 2,
    title: "Note 3",
    body: "This is the body content for note 3.",
    createdAt: new Date().toISOString(),
  },
  {
    id: +new Date() + 3,
    title: "Note 4",
    body: "This is the body content for note 4.",
    createdAt: new Date().toISOString(),
  },
  {
    id: +new Date() + 4,
    title: "Note 5",
    body: "This is the body content for note 5.",
    createdAt: new Date().toISOString(),
  },
];

export const foundIdDummy = (id) => dummyData.find((note) => note.id === id);
console.log("dummyData", dummyData);
export default dummyData;

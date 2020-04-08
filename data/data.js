export const TopTens = [
  {
    id: "top-10",
    category: "GEOGRAPHY",
    name: "Top 10",
    answers: [
      {
        value: "USA",
      },
    ],
    source: "https://google.com",
    description: "My Test top ten",
  },
];

export const Room = {
  id: "room0",
  members: [
    {
      id: "kgpasta",
      name: "Kaustubh Garimella",
    },
  ],
  topTen: TopTens[0],
  status: "NOTSTARTED",
};

import React from "react";
import Board from "react-trello/dist";

const data = {
  lanes: [
    {
      id: "backlogs",
      title: "Backlogs",
      label: "2/2",
      cards: [
        {
          id: "1",
          title: "Write Blog",
          description: "Can AI Make Sense",
          label: "Due Date - 22/03/2023",
          draggable: false,
        },
        {
          id: "2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          label: "Due Date - 21/04/2023",
          metadata: { sha: "be312a1" },
        },
      ],
    },

    {
      id: "lane2",
      title: "Completed",
      label: "0/0",
      cards: [],
    },
  ],
};

const KanbanBoard = () => {
  return <Board data={data} />;
};

export default KanbanBoard;

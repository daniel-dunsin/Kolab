import React from "react";
import { BiTrash } from "react-icons/bi";

interface Props {
  comment: string;
}

function Comment({ comment }: Props) {
  return (
    <article className="text-[.9rem] rounded-md p-3 border-2 shadow-md hover:shadow-lg cursor-pointer bg-white">
      <header className="flex items-center justify-between gap-2">
        <div className="flex gap-2  items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU"
            alt=""
            className="w-[30px] h-[30px] object-cover object-center rounded-full"
          />
          <p className="font-bold">Adejare Daniel</p>
        </div>
        <span>
          <BiTrash size={25} color="darkred" cursor="pointer" />
        </span>
      </header>

      <p className="mt-4 text-[.8rem] font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quod
        nobis deleniti unde, culpa reiciendis vitae dolor corrupti? Nam,
        quibusdam recusandae molestias, possimus unde maiores debitis natus
        inventore itaque sint nisi! Cumque perferendis ullam necessitatibus,
        corporis dolorum unde mollitia odio accusamus temporibus nostrum
        voluptatibus, iure dignissimos praesentium optio quasi laudantium odit
        sit nam obcaecati? Beatae nostrum vel incidunt neque provident.
      </p>
    </article>
  );
}

export default Comment;

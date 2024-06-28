import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const Meeting = ({ params }: Props) => {
  return <div>Meeting Room: #{params.id}</div>;
};

export default Meeting;

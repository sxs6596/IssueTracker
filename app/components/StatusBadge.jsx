import React from "react";
import {Badge, Flex} from "@radix-ui/themes";

const StatusBadge = (props) => {
  const StatusColor = {
    OPEN:{label:"Open", color:"red"},
    IN_PROGRESS:{label:"In Progress", color:"orange"},
    CLOSED:{label:"In Review", color:"blue"},
  }
  const  {status} = props; 

  if (!StatusColor[status]) {
    return null; // or return a default component
  }

  return (
    <div>
      <Flex gap="2">
        <Badge color={StatusColor[status].color}>{StatusColor[status].label}</Badge>
      </Flex>
    </div>
  );
};

export default StatusBadge;
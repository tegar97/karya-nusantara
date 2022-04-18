import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
function TimeLine({ trackingData }) {
    console.log(trackingData)
  return (
    <React.Fragment>
      <Timeline position="right" className="justify-start flex flex-1 ">
        {trackingData?.manifest?.map((data) => {
          return (
            <TimelineItem>
              <TimelineOppositeContent
                color="text.secondary"
                className="flex flex-col"
              >
                <span>{data.manifest_date}</span>
                <span>{data.manifest_time}</span>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="flex flex-col">
                {data.city_name && <span>kota : {data.city_name}</span>}
                <span>{data.manifest_code}</span>
                <span>{data.manifest_description}</span>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </React.Fragment>
  );
}

export default TimeLine;

import React,{useEffect,useState} from "react";
import useSWR from "swr";
import { SERVER_URL, FETCHER } from "@utils";
import dayjs from "dayjs";

function UserRow({ month, username }) {
  const [dutyStatics, setDutyStatics] = useState([]);

  useEffect(() => {
      // append 可以添加多个相同名称的参数

      let q = new URLSearchParams();
      q.append("username", username);
      // Append startDate and startTime
      q.append("startDate", dayjs().month(month).date(1).format("YYYY-MM-DD"));
      q.append("startTime", "00:00:00");

      // Append endDate and endTime
      q.append(
          "endDate",
          dayjs()
              .month(month + 1)
              .date(1)
              .format("YYYY-MM-DD")
      );
      q.append("endTime", "00:00:01");
      q.append("year", dayjs().get("year"));
      q.append("month", dayjs().get("month"));

      fetch(`${SERVER_URL}/query/statics?${q}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
              setDutyStatics(data);
          });
  }, [month, username]);

  return (
      <>
          <tr>
              <td>{username}</td>
              <td>
                  {Math.floor(
                      (dutyStatics?.totalCommanderTime?.dayShift +
                          +dutyStatics?.totalPositionTime?.dayShift +
                          dutyStatics?.totalTeacherTime?.dayShift +
                          dutyStatics?.totalStudentTime?.dayShift +
                          dutyStatics?.totalCommanderTime?.nightShift +
                          dutyStatics?.totalPositionTime?.nightShift +
                          dutyStatics?.totalTeacherTime?.nightShift +
                          dutyStatics?.totalStudentTime?.nightShift) *
                          100
                  ) / 100}
              </td>
          </tr>
      </>
  );
}

function RightBarSelectDayDetail() {
    const { data: usernames, error, isLoading } = useSWR(`${SERVER_URL}/query/orderedusername`, FETCHER);

    return (
        <div>
            {error ? (
                <div>error</div>
            ) : isLoading ? (
                <div>loading....</div>
            ) : (
                <div className="flex flex-col flex-1  flex-nowrap text-sm  ">
                    {usernames.flat().map((item, index) => {
                        return <UserRow key={index} month={dayjs().get("month")} username={item} />;
                    })}
                </div>
            )}
        </div>
    );
}

export default RightBarSelectDayDetail;

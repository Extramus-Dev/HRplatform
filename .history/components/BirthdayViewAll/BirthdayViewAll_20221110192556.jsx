import { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";

const BirthdayViewAll = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/BirthdayViewAll")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div>
      {data.map((birthday) => (
        <div
            key={birthday.id}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <Circle style={{ color: "#ccc", marginRight: "10px" }} />
                <div>
                    <h3>{birthday.name}</h3>
                    <p>{birthday.date}</p>
                </div>
            </div>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        ))}
    </div>
    );
};
export default BirthdayViewAll;
import { useState } from "react";
import { Home } from "./components/Home";
import { AddMarks } from "./components/AddMarks";
import { DeleteMarksheet } from "./components/DeleteMarksheet";
import { ShowMarksheet } from "./components/ShowMarksheet";
import { UpdateMarksheet } from "./components/UpdateMarksheet";

export function AppBar() {
  const [activeComponent, setActiveComponent] = useState("");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <button onClick={() => handleComponentChange("home")}>Home</button>
      <button onClick={() => handleComponentChange("addMarks")}>
        Add Marks
      </button>
      <button onClick={() => handleComponentChange("show")}>
        Show Marksheet
      </button>
      <button onClick={() => handleComponentChange("update")}>
        Update Marksheet
      </button>
      <button onClick={() => handleComponentChange("delete")}>
        Delete Marksheet
      </button>

      {activeComponent === "home" && null}
      {activeComponent === "addMarks" && <AddMarks />}
      {activeComponent === "show" && <ShowMarksheet />}
      {activeComponent === "update" && <UpdateMarksheet />}
      {activeComponent === "delete" && <DeleteMarksheet />}
    </div>
  );
}

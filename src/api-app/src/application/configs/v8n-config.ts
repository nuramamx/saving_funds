import v8n from "v8n";

function gender() {
  return (value: string) => value === "M" || value === "F";
}

v8n.extend({
  gender
});
import axios from "axios";
import { MYSERVER } from "../../source";
import Student from "../../student";

export async function get() {
  return await axios.get(MYSERVER);
}
export async function add(stu:Student) {
  return await axios.post(MYSERVER+'/add',stu);
}
export async function upd(stu:Student) {
  return await axios.put(MYSERVER+'/update/'+stu.id,stu);
}

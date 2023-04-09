import { BehaviorSubject } from "rxjs";
const user = localStorage.getItem("booking-user")
  ? JSON.parse(localStorage.getItem("booking-user"))
  : null;

export const globalState$ = new BehaviorSubject({
  user: user,
});

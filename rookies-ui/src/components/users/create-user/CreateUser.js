import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CreateUserContext } from "../../../contexts/providers/CreateUserProvider";

import styles from "./CreateUser.module.css";
import Title from "../../common/title/Title";

const CreateUser = (props) => {
  const { changeField, createUserState, submit, navigate } =
    useContext(CreateUserContext);

  return (
    <div className={styles["create-user"]}>
      <Title title="Create New User" />
      <Card>
        <CardContent>
          <form>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                First Name
              </FormLabel>
              <TextField
                onChange={changeField}
                className={styles["input"]}
                error={createUserState.error.firstName != null}
                helperText={createUserState.error.firstName}
                id="firstName"
                name="firstName"
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Last Name
              </FormLabel>
              <TextField
                onChange={changeField}
                className={styles["input"]}
                error={createUserState.error.lastName != null}
                helperText={createUserState.error.lastName}
                id="lastName"
                name="lastName"
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Date of birth
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={createUserState.form.dob}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    const e = {
                      target: {
                        name: 'dob',
                        value: newValue == null ? '' : `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`
                      }
                    }
                    changeField(e);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        error={
                          createUserState.error.dob != null || params.error
                        }
                        helperText={createUserState.error.dob}
                        id="dob"
                        name="dob"
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                onChange={changeField}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                id="gender"
                name="gender"
                defaultValue={true}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Joined Date
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={createUserState.form.joinedDate}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    const e = {
                      target: {
                        name: 'joinedDate',
                        value: newValue == null ? '' : `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`
                      }
                    }
                    changeField(e);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        error={
                          createUserState.error.joinedDate != null || params.error
                        }
                        helperText={createUserState.error.joinedDate}
                        id="joinedDate"
                        name="joinedDate"
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Type
              </FormLabel>
              <Select
                onChange={changeField}
                value={createUserState.form.role}
                id="role"
                name="role"
              >
                <MenuItem value={"STAFF"}>Staff</MenuItem>
                <MenuItem value={"ADMIN"}>Admin</MenuItem>
              </Select>
            </FormControl>
            <div className={styles["btn"]}>
              <Button
                variant="contained"
                color="error"
                disabled={!createUserState.enableSubmit}
                onClick={submit}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUser;

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  MenuList,
  Popover,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import styles from "./CreateAsset.module.css";
import Title from "../../common/title/Title";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useContext, useState } from "react";

import { CreateAssetContext } from "../../../contexts/providers/CreateAssetProvider";

const CreateAsset = (props) => {
  const {
    createAssetState,
    changeField,
    changeNewCategoryField,
    openNewCategoryField,
    closeNewCategoryField,
    addNewCategory,
    changeCategoryField,
    submit,
    navigate
  } = useContext(CreateAssetContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Title title="Create New Asset" />
      <Card>
        <CardContent>
          <form className={styles["create-asset"]}>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-name">Name</FormLabel>
              <TextField
                className={styles["input"]}
                id="name"
                name="name"
                onChange={changeField}
                inputProps={{ maxLength: 50 }}
                error={
                  createAssetState.error.name != null
                }
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-category">Category</FormLabel>
              <TextField
                disabled
                onClick={handleClick}
                value={createAssetState.form.categoryName}
                inputProps={{
                  maxLength: 50                  
                }}
                InputProps={{
                  endAdornment: <ArrowDropDownIcon />,
                }}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <MenuList
                  id="category"
                  name="category"
                  style={{ width: "500px", maxHeight: "200px", overflow: "auto" }}
                >
                  {createAssetState.categories && createAssetState.categories.map((item) => (
                    <MenuItem
                      key={item.code}
                      onClick={() => changeCategoryField(item.code)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
                <Divider />
                <div className={styles["new-category"]}>
                  {createAssetState.newCategory.isShowInput ? (
                    <div className={styles["wrap-input-new-category"]}>
                      <div className={styles["input-new-category"]}>
                        <TextField
                          className={styles["category-name"]}
                          id="newCategoryName"
                          name="name"
                          onChange={changeNewCategoryField}
                          value={createAssetState.newCategory.name}
                          placeholder="Name"
                          inputProps={{ maxLength: 50 }}
                        />
                        <TextField
                          className={styles["category-code"]}
                          id="newCategoryCode"
                          name="code"
                          value={createAssetState.newCategory.code}
                          onChange={changeNewCategoryField}
                          placeholder="Code"
                          inputProps={{ maxLength: 4 }}
                        />
                      </div>
                      <div className={styles["error"]}>{createAssetState.newCategory.error.name}</div>
                      <div className={styles["error"]}>{createAssetState.newCategory.error.code}</div>
                      <div className={styles["btn-new-category"]}>
                        <Button
                          color="success"
                          onClick={addNewCategory}
                          disabled={
                            !createAssetState.newCategory
                              .enableSubmit
                          }
                        >
                          <DoneIcon />
                        </Button>
                        <Button color="error" onClick={closeNewCategoryField}>
                          <CloseIcon />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles["link-category"]}
                      onClick={openNewCategoryField}
                    >
                      Add New Category
                    </div>
                  )}
                </div>
              </Popover>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-specification">Specification</FormLabel>
              <TextField
                className={styles["input"]}
                id="specification"
                name="specification"
                onChange={changeField}
                multiline
                rows={3}
                inputProps={{ maxLength: 150 }}
                error={
                  createAssetState.error.specification != null
                }
              />
            </FormControl>

            <FormControl className={styles["input"]}>
              <FormLabel id="label-installedDate">Installed Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={createAssetState.form.installedDate}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    const e = {
                      target: {
                        name: 'installedDate',
                        value: newValue == null ? '' : `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`
                      }
                    }
                    changeField(e);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        id="installedDate"
                        name="installedDate"
                        error={
                          createAssetState.error.installedDate != null || params.error
                        }
                        helperText={createAssetState.error.installedDate}

                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-state">State</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                id="state"
                name="state"
                defaultValue={"Available"}
                onChange={changeField}
              >
                <FormControlLabel
                  value={"Available"}
                  control={<Radio />}
                  label="Available"
                />
                <FormControlLabel
                  value={"Not available"}
                  control={<Radio />}
                  label="Not available"
                />
              </RadioGroup>
            </FormControl>
            <div className={styles["btn"]}>
              <Button
                variant="contained"
                color="error"
                disabled={!createAssetState.enableSubmit}
                onClick={submit}
              >
                Save
              </Button>
              <Button variant="contained" color="success" onClick={() => navigate('/assets')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateAsset;

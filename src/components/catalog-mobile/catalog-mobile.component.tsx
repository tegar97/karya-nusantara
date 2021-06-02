import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import FilterListIcon from "@material-ui/icons/FilterList";
import ProductSideBar from "../Product-sidebar/Product-sidebar";
import ProductSideBarItems from "../product-sidebar-items/product-sidebar-items";
import ProductSideBarItemsMobile from "../product-sidebar-items/product-sidebar-items-mobile";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      backgroundColor: "#5996ab",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CatalogMobile({ categoryData, setGetData, getData }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>
        <div className="flex items-center justify-center w-40 p-2 mb-2 bg-white cursor-pointer justify-items-center lg:hidden rounded-2xl ">
          <FilterListIcon
            fontSize="inherit"
            className="text-blue-100"
            style={{ fontSize: "1.3rem" }}
          />
          <span className="ml-1 text-blue-100 ">Katalog Product</span>
        </div>
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Katalog Product
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="p-2 text-lg ">
          {!categoryData
            ? "Loading ...."
            : categoryData.data.category.data.map((data) => (
                <ProductSideBarItemsMobile
                  setGetData={setGetData}
                  getData={getData}
                  key={data.id}
                  product={data}
                  handleClose={handleClose}
                />
              ))}
        </div>
      </Dialog>
    </div>
  );
}

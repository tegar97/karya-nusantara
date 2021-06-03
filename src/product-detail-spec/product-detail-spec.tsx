import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import convertToRupiah from "../util/converRupiah";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ProductDetailSpec({ product }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  function createMarkup() {
    return { __html: product.data[0].description };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="shadow-none">
      <AppBar
        position="static"
        style={{
          boxShadow: "none",
          outline: "none",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          aria-label="Spefikasi barang"
          TabIndicatorProps={{ style: { background: "#5996ab" } }}
          style={{
            borderTop: ".5px solid #585858",
            borderBottom: ".5px solid #585858",
          }}
          className="text-black bg-white shadow-none"
        >
          <Tab label="Deskripsi" {...a11yProps(0)} />
          <Tab label="Info lain" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="w-full mt-3 text-md" style={{ whiteSpace: "pre-line" }}>
          {product.data[0].description}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="flex flex-col mb-5">
          <span className="mb-2 font-medium">Waktu Pengerjaan : </span>
          <span className="text-sm">
            {product.data[0].isReadyStock === 1
              ? "Ready Stock"
              : product.data[0].processing_time}
          </span>
        </div>
        <div className="flex flex-col mb-5">
          <span className="mb-2 font-medium">Minimal Pesanan </span>
          <span className="text-sm">{product.data[0].minimum_order}</span>
        </div>
        <div className="flex flex-col ">
          <span className="mb-2 font-medium">Kisaran Harga</span>
          <span className="text-sm">
            {convertToRupiah(product.data[0].low_price)} -
            {convertToRupiah(product.data[0].high_price)}
          </span>
        </div>
      </TabPanel>
    </div>
  );
}

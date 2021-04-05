import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

export default function ProductDetailSpec() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
          <Tab label="Spesifikasi" {...a11yProps(1)} />
          <Tab label="Info lain" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <p className="mt-3 text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          provident, natus error sapiente voluptatem autem. Eveniet adipisci
          magni quod fugit cumque rerum, rem porro? Suscipit placeat reiciendis
          amet itaque voluptate? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quis, rem fugiat nihil assumenda autem nam dicta
          numquam sequi omnis quidem unde labore sint voluptatem vitae magnam
          consequuntur officia ad quae!
        </p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <span className="font-medium">Bahan :</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
          earum soluta, molestias ex repellat ipsam a perspiciatis voluptatibus
          deserunt dolor ducimus inventore ullam, et minima tempora facere
          debitis assumenda explicabo.
        </p>
        <div className="mt-2">
          <span>Spefikasi</span>
          <ul className="px-6 list-disc">
            <li>
              Bahan dibuat dengan kemampuan menahan partikel atau tahan
              ciptratan
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
            </li>
          </ul>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="flex flex-col mb-5">
          <span className="mb-2 font-medium">Waktu Pengerjaan : </span>
          <span className="text-sm">1 x 24 jam</span>
        </div>
        <div className="flex flex-col mb-5">
          <span className="mb-2 font-medium">Minimal Pesanan </span>
          <span className="text-sm">20</span>
        </div>
        <div className="flex flex-col ">
          <span className="mb-2 font-medium">Kisaran Harga</span>
          <span className="text-sm">Rp.21.000</span>
        </div>
      </TabPanel>
    </div>
  );
}

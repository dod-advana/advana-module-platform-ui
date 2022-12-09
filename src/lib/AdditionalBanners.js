import React from "react";
import { Typography } from "@material-ui/core";
import axiosLib from "axios";
import https from "https";
import Config from "./config/config";

const axios = axiosLib.create({
  httpsAgent: new https.Agent({ keepAlive: true }),
});

const styles = {
  container: {
    width: "100vw",
    height: "fit-content",
    display: "inline-block",
    position: "fixed",
    paddingTop: "2em",
    left: 0,
    zIndex: "16777271",
  },
  banner: (color, link) => ({
    width: "100%",
    backgroundColor: color,
    color: "white",
    height: "2em",
    lineHeight: "2em",
    borderTop: "0.1px solid rgba(0,0,0,0.20)",
    textDecoration: link ? "underline" : "none",
    cursor: link ? "pointer" : "default",
  }),
  link: (link) => ({
    textDecoration: "none",
    pointerEvents: link ? "auto" : "none",
  }),
};

const Banner = (props) => {
  const { color, text, link } = props;

  return (
    <a href={link} style={styles.link(link)} target="_blank" rel="noreferrer noopener">
      <Typography variant="body2" noWrap={true} align="center" style={styles.banner(color, link)}>
        {text}
      </Typography>
    </a>
  );
};

const AdditionalBanners = ({ handleOffset, appName, containerStyles={}}) => {
  const { useEffect, useState } = React;

  const [displayBanners, setDisplayBanners] = useState([]);

  useEffect(() => {
    const getBanners = async () => {
      const bannersEditorGET = async () => axios.get(Config.BANNER_LINK);
      const bannersData = await bannersEditorGET();
      const filteredBannersData = bannersData.data.filter((banner) => {
        return banner.display === "Yes" && (banner.app_space === "All" || banner.app_space === appName);
      });
      setDisplayBanners(filteredBannersData);
      handleOffset(filteredBannersData.length);
    };

    getBanners();
  }, [handleOffset, appName]);

  return (
    <div style={{...(styles.container), ...containerStyles}} data-test-id="additional-banners">
      {displayBanners.length !== 0 &&
        displayBanners.map((banner) => {
          return (
            <div key={banner.id}>
              <Banner color={banner.color} text={banner.description} link={banner.link} />
            </div>
          );
        })}
    </div>
  );
};

export default AdditionalBanners;

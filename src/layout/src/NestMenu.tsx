import React, { useState } from "react";
import { ReactNode } from "react";
import { Icon, ListItemIcon, MenuList } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import lodashGet from "lodash/get";
import clsx from "clsx";
import { useResourceDefinitions } from "ra-core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createElement } from "react";
import DefaultIcon from "@mui/icons-material/ViewList";
// import { DRAWER_WIDTH, CLOSED_DRAWER_WIDTH } from './Sidebar';
import { DRAWER_WIDTH, CLOSED_DRAWER_WIDTH } from "react-admin";
import { useSidebarState } from "react-admin";
// import { MenuItemLink } from 'react-admin';
// import { MenuItemLink } from 'react-admin';
import { NestMenuItemLink } from "./NestMenuItem";
import { ResourceNestMenuItem } from "./NestResourceMenuItem";

export const NestMenu = (props: MenuProps) => {
  const [openNest, setOpenNest] = useState(false);

  const resources = useResourceDefinitions();
  // console.log(resources);
  const {
    hasDashboard,
    children = [
      ...Object.keys(resources)
        .filter((name) => resources[name].hasList)
        .map((name) => <ResourceNestMenuItem key={name} name={name} />),
    ],
    className,
    label,
    ...rest
  } = props;

  const [open] = useSidebarState();

  const handleClick = () => {
    setOpenNest(!openNest);
  };
  return (
    <Root
      className={clsx(
        {
          [MenuClasses.open]: open,
          [MenuClasses.closed]: !open,
        },
        className
      )}
      {...rest}
    >
      <div className="text-left pl-4 flex" onClick={handleClick}>
        {!openNest && 
        // <i className="chevron down icon large"></i>
        <Icon>expand_more</Icon>
        }
        {openNest && 
        // <i className="chevron right icon large"></i>
        <Icon>expand_less</Icon>
        }
        <span className="pl-4">
            {label}
            </span>
      </div>
      {openNest && <div>{children}</div>}
    </Root>
  );
};

// NOTE: We don't extends MenuListProps here to avoid breaking changes
export interface MenuProps {
  children?: ReactNode;
  className?: string;
  label: string;
  dense?: boolean;
  hasDashboard?: boolean;
  [key: string]: any;
}

NestMenu.propTypes = {
  className: PropTypes.string,
  dense: PropTypes.bool,
  hasDashboard: PropTypes.bool,
};

// re-export MenuItem commponents for convenience
// NestMenu.Item = MenuItemLink;
NestMenu.Item = NestMenuItemLink;
NestMenu.ResourceItem = ResourceNestMenuItem;

const PREFIX = "RaMenu";

export const MenuClasses = {
  open: `${PREFIX}-open`,
  closed: `${PREFIX}-closed`,
  icon: `${PREFIX}-icon`,
};

const Root = styled(MenuList, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingTop: "0",
  paddingBottom: "0",
  [theme.breakpoints.only("xs")]: {
    marginTop: 0,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [`&.${MenuClasses.open}`]: {
    width: lodashGet(theme, "sidebar.width", DRAWER_WIDTH),
  },

  [`&.${MenuClasses.closed}`]: {
    width: lodashGet(theme, "sidebar.closedWidth", CLOSED_DRAWER_WIDTH),
  },
  [`& .${MenuClasses.icon}`]: { minWidth: theme.spacing(5) },
}));

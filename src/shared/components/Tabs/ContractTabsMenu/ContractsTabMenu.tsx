import React, { memo, ReactNode, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { width } from 'Utils/screen';
// import { Icon } from "Components/Icons";

import { Icon } from 'Components/Icons';
import { Tab } from '../Tab';

import classes from './projectsTabMenu.module.css';

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
}

const createTabs = (activeTab: string, onTabClick: (e: any) => void) => (
  <>
    <Tab
      key="my-projects-tab"
      id="my-projects-tab"
      className={`${classes.flexCenter} ${classes.button} ${
        activeTab === 'my-projects-tab' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="my-projects"
      onClick={onTabClick}
    >
      <>
        <Icon type="projects" className={classes.icon} fill="white" />
        <span>Contract Forms</span>
      </>
    </Tab>
  </>
);

/*
  In order to override bootstraps active class on tabs, there is a click event onTabClick, which will get the name of the tab that was clicked
  and then trigger a re-render.  Note in the createTabs method above, where the active class is added or not, based on which tab was clicked.
*/
const ContractsTabMenu = ({ id = 'tabs', className, children }: Props) => {
  // We want to set the initial active tab to the first tab in the incoming tabList
  const [activeTab, setActiveTab] = useState('my-projects-tab');

  const onTabClick = (e: any) => {
    // Occasionally, e.currentTarget is undefined.  Set the current activeTab if we run into this bug

    setActiveTab(e?.currentTarget?.id || activeTab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className={classes.projectsTabWrapper}>
            <div className={classes.tabsContainer}>
              <ul
                className={`nav nav-tabs pr-4 ${width < 576 ? 'flex-sm-column' : 'width'}   ${classes.tabs} ${
                  className || ''
                }`}
                id={id}
                role="tablist"
              >
                {createTabs(activeTab, onTabClick)}
              </ul>
            </div>
            <div className="tab-content w-100 h-100 d-inline-block" id="myTabContent" style={{ height: 'auto' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContractsTabMenu.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
};

const ContractsTabMenuMemo = memo(ContractsTabMenu, areEqual);
export { ContractsTabMenuMemo as ContractsTabMenu };

/* eslint-disable arrow-body-style */

import { Icon } from 'Components/Icons';
import { Table, TableBody, TableColumn, TableHeader, TableRow, Th } from 'Components/Table';
import { ContractsTabMenu } from 'Components/Tabs/ContractTabsMenu';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';

import React, { memo, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import classes from './contract.module.css';
import { CreateModal } from './CreateContract/CreateModal';
import { DeleteModal } from './DeleteModal/DeleteModal';

const ContractContainer = () => {
  const user: UserModel = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);
  const [deleteId, setDelId] = useState('1');
  const [data, setData] = useState([
    ['lol', 'haha'],
    ['', ''],
  ]);
  const init = async () => {
    if (user?.id) {
      const { companies } = user;

      if (companies.length > 0) {
        const [company] = companies;
        const { id, address, name, website } = company;
        const response = await fetch(`/companies/${id}/contract-forms`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => data);
        if (response.status === 200) {
          setData(JSON.parse(response));
        }
      }
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <ContractsTabMenu>
      <div className={classes.head}>
        <h1>Form Templates</h1>
        <button
          className={classes.button}
          onClick={() => {
            setCreate(true);
          }}
        >
          Add +
        </button>
      </div>
      <div className={classes.tabBody}>
        <Table>
          <TableHeader>
            <TableRow>
              <Th>Template Name</Th>
              <Th>Date Created</Th>
              <Th> </Th>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {data.map((dat) => {
              return (
                <TableRow>
                  <TableColumn>{dat.templateName}</TableColumn>
                  <TableColumn>{dat.dateCreated}</TableColumn>
                  <TableColumn>
                    <Icon
                      type="trash"
                      onClick={() => {
                        setDelId(dat.contractId);
                        setOpen(true);
                      }}
                    />
                  </TableColumn>
                </TableRow>
              );
            })} */}
            <TableRow>
              <TableColumn>template</TableColumn>
              <TableColumn>createdAt</TableColumn>
              <TableColumn>
                <Icon
                  type="trash"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              </TableColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <CreateModal isOpen={create} closeModal={setCreate} />
      <DeleteModal contractId={deleteId} isOpen={open} closeModal={setOpen} />
    </ContractsTabMenu>
  );
};

const ContractContainerMemo = memo(ContractContainer, areEqual);

export { ContractContainerMemo as Contract };

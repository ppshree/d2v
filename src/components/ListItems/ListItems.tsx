/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UserTableList } from '../UserTableList/UserTableList';
import { FilterHeader } from '../FilterHeader/FilterHeader';
import { FilterBottom } from '../FilterBottom/FilterBottom';
import { TagTableList } from '../TagTableList/TagTableList';
import { ClassList } from '../ClassList/ClassList';
import { SchoolTableList } from '../SchoolTableList/SchoolTableList';
import { SubjectList } from '../SubjectList/SubjectList';

interface Iprops {
  refer?: string;
  itemList: any[];
  updateAction: (item: any) => void;
  deleteAction: (item: any) => void;
  children: React.ReactElement<any>;
  filterObj?: any;
  setFilterObj?: React.Dispatch<React.SetStateAction<any>>;
}

const ListItems: any = (props: Iprops) => {
  const { children, itemList, updateAction, deleteAction, refer, filterObj, setFilterObj } = props;

  const childrenWithProps = React.Children.map(children, (child: React.ReactElement<any>) => {
    const defaultProps = child.props;
    switch (child.key) {
      case 'filterheader':
      case 'filterBottom':
        return React.cloneElement(child, {
          ...defaultProps,
          refer,
          filterObj,
          setFilterObj,
        });
      case 'itemList':
        return React.cloneElement(child, {
          refer,
          itemList,
          updateAction,
          deleteAction,
          ...defaultProps,
        });
      default:
        return React.cloneElement(child, {
          ...defaultProps,
        });
    }
  });
  return <>{childrenWithProps}</>;
};

ListItems.FilterHeader = FilterHeader;
ListItems.UserTableList = UserTableList;
ListItems.TagTableList = TagTableList;
ListItems.ClassList = ClassList;
ListItems.SubjectList = SubjectList;
ListItems.SchoolTableList = SchoolTableList;
ListItems.FilterBottom = FilterBottom;

export { ListItems };

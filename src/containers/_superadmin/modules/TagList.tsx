/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { TagForm } from '../../../components/FormModalContent/TagForm/TagForm';
import { updateSelectedTag, updateFormError } from '../SuperAdminHomeSlice';
import { ITags } from '../../../app/entity/model';
import { retrieveAllTags, createNewTags, deleteTags } from '../../../app/service/superadmin.service';
import { ListItems } from '../../../components/ListItems/ListItems';

export const TagList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { tagList, selectedTags, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    dispatch(retrieveAllTags(filterObj));
  }, [filterObj]);

  const openModalForm = () => {
    dispatch(
      updateSelectedTag({
        learning_outcome: '',
        created_by: loggedInUser.email,
      }),
    );
  };

  const addOrUpdateTag = (userObj: ITags) => {
    dispatch(updateFormError(''));
    if (userObj.learning_outcome && loggedInUser.email) {
      dispatch(createNewTags(userObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
    }
  };

  const updateTagAction = (userObj: ITags) => {
    dispatch(updateSelectedTag(userObj));
  };

  const deleteTagAction = (userId: string) => {
    dispatch(deleteTags(userId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedTag({
        learning_outcome: '',
        created_by: '',
      }),
    );
  };

  return (
    <>
      {/* Header Part */}
      <Header handleModalOpen={openModalForm} title={'Tags'} />
      {/* Modal Part */}
      {selectedTags !== null && selectedTags?.created_by !== '' && (
        <ModalLayout title="Tag Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <TagForm addOrUpdateTag={addOrUpdateTag} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* Tag Table List */}
      <ListItems
        refer="Tag"
        itemList={tagList}
        updateAction={updateTagAction}
        deleteAction={deleteTagAction}
        filterObj={filterObj}
        setFilterObj={setFilterObj}
      >
        <ListItems.FilterHeader key="filterheader" />
        <ListItems.TagTableList isLoading={loader} key="itemList" />
        <ListItems.FilterBottom key="filterBottom" listLength={count} />
      </ListItems>
    </>
  );
};

// export default TagList;

import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { TagTableList } from '../../../components/TagTableList/TagTableList';
import { TagForm } from '../../../components/FormModalContent/TagForm/TagForm';
import { updateSelectedTag, updateFormError } from '../SuperAdminHomeSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';
import { ITags } from '../../../app/entity/model';
import { retrieveAllTags, createNewTags, deleteTags } from '../../../app/service/superadmin.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';
import { Loader } from '../../../components/Loader/Loader';

export const TagList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { tagList, selectedTags, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const [queryName, setQueryName] = useState<string>('');

  useEffect(() => {
    setOffset(0);
  }, [limit]);

  useEffect(() => {
    // debounce effect
    if (queryName) {
      const timer = setTimeout(() => {
        dispatch(
          retrieveAllTags({
            name: queryName,
            limit,
            offset,
          }),
        );
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch(
        retrieveAllTags({
          name: '',
          limit,
          offset,
        }),
      );
    }
  }, [limit, offset, queryName]);

  const openModalForm = () => {
    dispatch(
      updateSelectedTag({
        learning_outcome: '',
        created_by: loggedInUser.email,
      }),
    );
  };

  const addOrUpdateTag = (userObj: ITags) => {
    try {
      dispatch(updateFormError(''));
      if (userObj.learning_outcome && loggedInUser.email) {
        dispatch(createNewTags(userObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
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
      {/* Filter Header Part */}
      <FilterHeader filterFor="Tag" />
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="sm:my-3 xsm:my-3">
            <TagTableList updateAction={updateTagAction} deleteAction={deleteTagAction} tagList={tagList} />
          </div>
          {/* Filter Bottom Part */}
          <FilterBottom listLength={count} />
        </>
      )}
    </>
  );
};

// export default TagList;

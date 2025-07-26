import React, { useCallback, forwardRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const CustomBottomSheet = forwardRef(({ children, onSheetChange, snapPoints, isOpen }, ref) => {
    const handleSheetChanges = useCallback(
        (index) => {
            if (onSheetChange) {
                onSheetChange(index);
            }
        }, [onSheetChange]
    );

    return (
        <Container>
            {isOpen && (
                <BottomSheet
                    ref={ref}
                    onChange={handleSheetChanges}
                    snapPoints={snapPoints || ['50%']}
                    enablePanDownToClose={true}
                >
                    <Content>{children}</Content>
                </BottomSheet>
            )}
        </Container>
    );
});

const Container = styled(GestureHandlerRootView)`
    flex: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.88);
    justify-content: flex-end;
    z-index: 10;
`

const Content = styled(BottomSheetView)`
    flex: 1;
    padding: 38px 25px 230px 25px;
`

CustomBottomSheet.propTypes = {
    children: PropTypes.node.isRequired,
    onSheetChange: PropTypes.func,
    snapPoints: PropTypes.arrayOf(PropTypes.string),
    isOpen: PropTypes.bool.isRequired,
};

export default CustomBottomSheet;

import { ReactElement } from 'react';
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CloseIcon } from '@app/assets/icons/CloseIcon';
import { GlobalStyles } from '@app/constants/styles';

interface Props {
  visible: boolean;
  children: React.ReactNode;
  header: ReactElement | null;
  footer: ReactElement | null;
  onCancel: () => void;
}

export const ModalPopup = ({ visible, children, header, footer, onCancel }: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable
        style={styles.background}
        onPress={event => {
          if (event.target === event.currentTarget) {
            onCancel();
          }
        }}>
        <View style={styles.container}>
          {header && (
            <View style={styles.header}>
              <View>{header}</View>
              <TouchableOpacity onPress={onCancel}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.body}>{children}</View>
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: GlobalStyles.colors.white,
    padding: 16,
    borderRadius: 24,
    elevation: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  body: {},
  footer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});

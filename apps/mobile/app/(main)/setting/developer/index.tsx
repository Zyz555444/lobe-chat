import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SettingItem, SettingGroup } from '../(components)';
import { useStyles } from './styles';
import {
  clearAuthData,
  expireAccessTokenNow,
  expireRefreshTokenNow,
  invalidateAccessToken,
  invalidateRefreshToken,
} from './utils';

export default function DeveloperScreen() {
  const { styles } = useStyles();
  const { t } = useTranslation(['setting']);

  const confirmThenExecute = (
    confirmMessage: string,
    execute: () => Promise<void>,
    successMessage: string,
  ) => {
    const confirmTitle = t('actions.confirm', { ns: 'common' });
    const confirmText = t('actions.confirm', { ns: 'common' });
    const cancelText = t('actions.cancel', { ns: 'common' });
    const developerTitle = t('developer.title', { ns: 'setting' });
    const failurePrefix = t('developer.failurePrefix', { ns: 'setting' });

    Alert.alert(
      confirmTitle,
      confirmMessage,
      [
        { style: 'cancel', text: cancelText },
        {
          onPress: async () => {
            try {
              await execute();
              Alert.alert(developerTitle, successMessage);
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              Alert.alert(developerTitle, `${failurePrefix}${msg}`);
            }
          },
          style: 'destructive',
          text: confirmText,
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <SettingGroup>
        <SettingItem
          onPress={() =>
            confirmThenExecute(
              t('developer.accessToken.expire.title', { ns: 'setting' }),
              expireAccessTokenNow,
              t('developer.accessToken.expire.success', { ns: 'setting' }),
            )
          }
          title={t('developer.accessToken.expire.title', { ns: 'setting' })}
        />
        <SettingItem
          onPress={() =>
            confirmThenExecute(
              t('developer.refreshToken.expire.title', { ns: 'setting' }),
              expireRefreshTokenNow,
              t('developer.refreshToken.expire.success', { ns: 'setting' }),
            )
          }
          title={t('developer.refreshToken.expire.title', { ns: 'setting' })}
        />
        <SettingItem
          onPress={() =>
            confirmThenExecute(
              t('developer.accessToken.invalidate.title', { ns: 'setting' }),
              invalidateAccessToken,
              t('developer.accessToken.invalidate.success', { ns: 'setting' }),
            )
          }
          title={t('developer.accessToken.invalidate.title', { ns: 'setting' })}
        />
        <SettingItem
          onPress={() =>
            confirmThenExecute(
              t('developer.refreshToken.invalidate.title', { ns: 'setting' }),
              invalidateRefreshToken,
              t('developer.refreshToken.invalidate.success', { ns: 'setting' }),
            )
          }
          title={t('developer.refreshToken.invalidate.title', { ns: 'setting' })}
        />
        <SettingItem
          onPress={() =>
            confirmThenExecute(
              t('developer.clearAuthData.title', { ns: 'setting' }),
              clearAuthData,
              t('developer.clearAuthData.success', { ns: 'setting' }),
            )
          }
          title={t('developer.clearAuthData.title', { ns: 'setting' })}
        />
      </SettingGroup>
    </ScrollView>
  );
}

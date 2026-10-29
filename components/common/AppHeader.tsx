import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NotificationBellButton } from '../CollegeNotificationsModal';
import { useAuth } from '../auth-context';
import { useTheme } from '../theme-context';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  backLabel?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  backLabel,
  onBack,
  rightAction,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const { profile } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const initial = (profile?.name || 'User').charAt(0).toUpperCase();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDark && styles.containerDark,
        { paddingTop: Math.max(insets.top, 12) + 6 },
      ]}
    >
      <View style={styles.contentRow}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Feather
              name="arrow-left"
              size={18}
              color={isDark ? "#F8FAFC" : "#0f172a"}
            />
            <Text style={[styles.backLabel, isDark && styles.textDark]}>
              {backLabel || 'Back'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.brandRow}>
            <View style={styles.brandIconBox}>
              <Feather name="file-text" size={17} color="#FFFFFF" />
            </View>
            <Text style={[styles.brandTitle, isDark && styles.textDark]}>
              Skill<Text style={{ color: '#0066FF' }}>Exa</Text>
            </Text>
          </View>
        )}

        {/* Center Title when in inner page */}
        {showBack && title && (
          <View style={styles.centerTitleWrapper}>
            <Text
              style={[styles.centerTitle, isDark && styles.textDark]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={[styles.centerSubtitle, isDark && styles.subtitleDark]}
                numberOfLines={1}
              >
                {subtitle}
              </Text>
            )}
          </View>
        )}

        {/* Right side Actions */}
        <View style={styles.rightGroup}>
          {rightAction ? (
            rightAction
          ) : (
            <View style={styles.actionItemsRow}>
              {/* Dark / Light Theme Toggle */}
              <TouchableOpacity
                style={[styles.iconButton, isDark && styles.iconButtonDark]}
                onPress={toggleTheme}
                activeOpacity={0.7}
                accessibilityLabel="Toggle Theme"
              >
                <Feather
                  name={isDark ? "sun" : "moon"}
                  size={17}
                  color={isDark ? "#F59E0B" : "#0F172A"}
                />
              </TouchableOpacity>

              {/* Settings Button */}
              <TouchableOpacity
                style={[styles.iconButton, isDark && styles.iconButtonDark]}
                onPress={() => router.push('/settings' as any)}
                activeOpacity={0.7}
                accessibilityLabel="Settings"
              >
                <Feather
                  name="settings"
                  size={17}
                  color={isDark ? "#94A3B8" : "#0F172A"}
                />
              </TouchableOpacity>

              {/* Notification Bell */}
              <NotificationBellButton />

              {/* Avatar Circle */}
              <TouchableOpacity
                style={[styles.avatarButton, isDark && styles.avatarButtonDark]}
                onPress={() => router.push('/profile' as any)}
                activeOpacity={0.8}
              >
                <Text style={[styles.avatarText, isDark && styles.avatarTextDark]}>
                  {initial}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingHorizontal: 20,
    paddingBottom: 12,
    zIndex: 50,
  },
  containerDark: {
    backgroundColor: '#070B14',
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 38,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  textDark: {
    color: '#F8FAFC',
  },
  subtitleDark: {
    color: '#94A3B8',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingRight: 8,
  },
  backLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  centerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  centerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  centerSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionItemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  avatarButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButtonDark: {
    backgroundColor: '#0F172A',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  avatarTextDark: {
    color: '#F8FAFC',
  },
});

import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { createContext, useContext, useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type UserProfile = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  profile: UserProfile;
  login: (profile: UserProfile) => void;
  logout: () => void;
};

const defaultProfile: UserProfile = {
  name: "",
  email: "",
  password: "",
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  profile: defaultProfile,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const login = React.useCallback((nextProfile: UserProfile) => {
    setProfile(nextProfile);
    setIsAuthenticated(true);
  }, []);

  const logout = React.useCallback(() => {
    setProfile(defaultProfile);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, profile, login, logout }),
    [isAuthenticated, profile, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function TopProfileMenu() {
  const { isAuthenticated, profile, logout } = useAuth();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const hiddenRoutes = ["/login", "/register", "/register-user"];

  if (!isAuthenticated || hiddenRoutes.includes(pathname)) {
    return null;
  }

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
    router.replace("/login");
  };

  return (
    <>
      <View style={[styles.container, { top: insets.top + 8 }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setMenuVisible(true)}
          style={styles.iconButton}
        >
          <Ionicons name="person-circle" size={34} color="#0f766e" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setDetailsVisible(true);
              }}
            >
              <Text style={styles.menuText}>Profile View</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.detailsBackdrop}>
          <View style={styles.detailsCard}>
            <Text style={styles.title}>User Profile</Text>
            <Text style={styles.detailText}>
              Name: {profile.name || "Guest User"}
            </Text>
            <Text style={styles.detailText}>Email: {profile.email}</Text>
            <Text style={styles.detailText}>Password: {profile.password}</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDetailsVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    zIndex: 999,
  },
  iconButton: {
    backgroundColor: "#ffffff",
    borderRadius: 999,
    padding: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 64,
    paddingRight: 16,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menuCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 8,
    width: 160,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 15,
    color: "#0f172a",
  },
  detailsBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    padding: 20,
  },
  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 360,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0f172a",
  },
  detailText: {
    fontSize: 15,
    marginBottom: 8,
    color: "#334155",
  },
  closeButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#06b6d4",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

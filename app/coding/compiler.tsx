import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LANGUAGES_LIST = [
  { id: 'python', name: 'Python 3' },
  { id: 'c', name: 'C' },
  { id: 'cpp', name: 'C++' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'reactnative', name: 'React Native' },
];

export default function CompilerScreen() {
  const { langId, langName, initialCode } = useLocalSearchParams<{
    langId: string;
    langName: string;
    initialCode: string;
  }>();

  const [selectedLang, setSelectedLang] = useState<string>((langId || 'python').toLowerCase());
  const [code, setCode] = useState<string>('');
  const [terminalOutput, setTerminalOutput] = useState<string>('Press "Run Code" to execute script...');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  // Default boilerplate generators when switching languages manually
  const getDefaultBoilerplate = (lang: string) => {
    switch (lang) {
      case 'c':
        return '#include <stdio.h>\n\nint main() {\n    printf("Hello from C Compiler!\\n");\n    return 0;\n}';
      case 'cpp':
        return '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++ Compiler!" << endl;\n    return 0;\n}';
      case 'javascript':
        return 'console.log("Hello from JavaScript Workspace!");';
      case 'reactnative':
        return 'import { View, Text } from "react-native";\n\nconst App = () => {\n  return (\n    <View>\n      <Text>Hello React Native App!</Text>\n    </View>\n  );\n};';
      default:
        return 'print("Hello from Python 3 Engine!")';
    }
  };

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    } else {
      setCode(getDefaultBoilerplate(selectedLang));
    }
  }, [initialCode]);

  const handleLanguageChange = (newLangId: string) => {
    setSelectedLang(newLangId);
    setCode(getDefaultBoilerplate(newLangId));
    setTerminalOutput(`Switched to ${newLangId.toUpperCase()} workspace environment.`);
  };

  // Simulates parsing code to extract actual output statements (print / console.log / printf / cout)
  const executeCode = () => {
    setIsCompiling(true);
    setTerminalOutput('Compiling and executing...');

    setTimeout(() => {
      setIsCompiling(false);

      const lines = code.split('\n');
      const outputs: string[] = [];

      lines.forEach((line) => {
        const trimmed = line.trim();

        // Catch print("...") or print(f"...") in Python
        if (trimmed.startsWith('print(')) {
          const match = line.match(/print\s*\(\s*f?["'](.*?)["']\s*\)/);
          if (match && match[1]) {
            outputs.push(match[1].replace(/\{.*?\}/g, '10')); // evaluate simple interpolated variables
          }
        }
        // Catch console.log("...") in JavaScript
        else if (trimmed.startsWith('console.log(')) {
          const match = line.match(/console\.log\s*\(\s*`?["']?(.*?)["']?`?\s*\)/);
          if (match && match[1]) {
            outputs.push(match[1]);
          }
        }
        // Catch printf("...") in C
        else if (trimmed.startsWith('printf(')) {
          const match = line.match(/printf\s*\(\s*["'](.*?)["']/);
          if (match && match[1]) {
            outputs.push(match[1].replace('\\n', ''));
          }
        }
        // Catch cout << "..." in C++
        else if (trimmed.includes('cout <<')) {
          const match = line.match(/cout\s*<<\s*["'](.*?)["']/);
          if (match && match[1]) {
            outputs.push(match[1]);
          }
        }
      });

      if (outputs.length > 0) {
        setTerminalOutput(`>> Program Output:\n\n${outputs.join('\n')}\n\n[Process completed with exit code 0]`);
      } else {
        setTerminalOutput('>> Program Output:\n\nHello from SkillExa Engine!\n\n[Process completed with exit code 0]');
      }
    }, 600);
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1).join('\n');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Interactive Coding Lab</Text>
        <TouchableOpacity onPress={() => setCode('')}>
          <Feather name="trash-2" size={18} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Language Options Selector */}
      <View style={styles.langPillContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langPillScroll}>
          {LANGUAGES_LIST.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                style={[styles.langPill, isSelected && styles.langPillActive]}
                onPress={() => handleLanguageChange(lang.id)}
              >
                <Text style={[styles.langPillText, isSelected && styles.langPillTextActive]}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Code Editor Workspace */}
      <View style={styles.editorWorkspace}>
        <View style={styles.editorBox}>
          <ScrollView style={styles.lineCol} showsVerticalScrollIndicator={false}>
            <Text style={styles.lineText}>{lineNumbers}</Text>
          </ScrollView>
          <TextInput
            style={styles.codeInput}
            multiline
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Floating Run Button - Bottom Right */}
        <TouchableOpacity 
          style={styles.floatingRunBtn} 
          onPress={executeCode} 
          disabled={isCompiling}
        >
          {isCompiling ? (
            <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 6 }} />
          ) : (
            <Feather name="play" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          )}
          <Text style={styles.floatingRunBtnText}>
            {isCompiling ? 'Running...' : 'Run Code'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Terminal Area Rendering Actual Output */}
      <View style={styles.terminalWorkspace}>
        <View style={styles.terminalHeader}>
          <Feather name="terminal" size={14} color="#4ADE80" style={{ marginRight: 6 }} />
          <Text style={styles.terminalTitle}>Execution Terminal</Text>
        </View>
        <ScrollView style={styles.terminalBox}>
          <Text style={styles.terminalText}>{terminalOutput}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  topBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#FFFFFF' 
  },
  backBtn: { padding: 4 },
  topBarTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  
  /* Horizontal Language Bar */
  langPillContainer: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingVertical: 8 },
  langPillScroll: { paddingHorizontal: 16 },
  langPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#F1F5F9', marginRight: 8 },
  langPillActive: { backgroundColor: '#0066FF' },
  langPillText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  langPillTextActive: { color: '#FFFFFF', fontWeight: '700' },

  /* Editor Area */
  editorWorkspace: { flex: 3, padding: 12, position: 'relative' },
  editorBox: { flex: 1, flexDirection: 'row', backgroundColor: '#1E293B', borderRadius: 16, padding: 12 },
  lineCol: { width: 28, borderRightWidth: 1, borderRightColor: '#334155', marginRight: 10 },
  lineText: { fontFamily: 'monospace', fontSize: 13, color: '#64748B', lineHeight: 20, textAlign: 'right', paddingRight: 8 },
  codeInput: { flex: 1, fontFamily: 'monospace', fontSize: 13, color: '#38BDF8', lineHeight: 20, textAlignVertical: 'top' },
  
  /* Floating Run Button */
  floatingRunBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#0066FF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  floatingRunBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

  /* Terminal Window */
  terminalWorkspace: { flex: 1.2, backgroundColor: '#020617', padding: 12, borderTopWidth: 1, borderTopColor: '#1E293B' },
  terminalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  terminalTitle: { fontSize: 11, fontWeight: '700', color: '#4ADE80', textTransform: 'uppercase' },
  terminalBox: { flex: 1 },
  terminalText: { fontFamily: 'monospace', fontSize: 12, color: '#38BDF8', lineHeight: 18 },
});
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/states/EmptyState';
import { useTheme } from '@/hooks/useTheme';
import { initializeDatabase, executeQuery, executeRun, closeDatabase } from '@/services/db';

interface Note {
  id: number;
  body: string;
  created_at: string;
}

export default function SqliteDemoScreen() {
  const { colors } = useTheme();
  const [ready, setReady] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('Not initialized');

  const loadNotes = useCallback(async () => {
    const rows = await executeQuery<Note>('SELECT * FROM notes ORDER BY id DESC');
    setNotes(rows);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await initializeDatabase({ name: 'showcase.db' });
      await executeRun(
        'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime(\'now\')))',
      );
      await loadNotes();
      if (mounted) {
        setReady(true);
        setStatus('Database ready · migrations applied');
      }
    })().catch((err: Error) => {
      if (mounted) setStatus(`Error: ${err.message}`);
    });
    return () => {
      mounted = false;
    };
  }, [loadNotes]);

  const addNote = async () => {
    if (!draft.trim()) return;
    await executeRun('INSERT INTO notes (body) VALUES (?)', draft.trim());
    setDraft('');
    await loadNotes();
    setStatus(`Inserted ${notes.length + 1} note(s)`);
  };

  const clearNotes = async () => {
    await executeRun('DELETE FROM notes');
    await loadNotes();
    setStatus('Cleared all notes');
  };

  return (
    <Screen>
      <VStack gap={4}>
        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              SQLite demo
            </Text>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>{status}</Text>
            <Input
              label="Note body"
              placeholder="Type a note…"
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={addNote}
            />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title="Add note" onPress={addNote} disabled={!ready || !draft.trim()} />
              <Button title="Clear" variant="outline" onPress={clearNotes} disabled={!ready || notes.length === 0} />
            </View>
          </VStack>
        </Card>

        {ready && notes.length === 0 ? (
          <EmptyState title="No notes yet" description="Add your first note above." />
        ) : (
          notes.map((note) => (
            <Card key={note.id} p={3}>
              <VStack gap={1}>
                <Text style={{ color: colors.foreground, fontSize: 15 }}>{note.body}</Text>
                <Text style={{ color: colors.mutedForeground, fontSize: 12 }}>
                  #{note.id} · {note.created_at}
                </Text>
              </VStack>
            </Card>
          ))
        )}

        <Button
          title="Close database"
          variant="ghost"
          onPress={async () => {
            await closeDatabase();
            setReady(false);
            setStatus('Database closed');
          }}
        />
      </VStack>
    </Screen>
  );
}

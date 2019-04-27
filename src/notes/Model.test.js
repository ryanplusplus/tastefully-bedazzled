import Model from './Model';

const Api = () => {
  const store = {};
  let current = 2789432;

  return {
    store,
    current: () => current,

    read: async (id) => store[id],

    write: async (id, content) => store[id] = content,

    create: async (content) => {
      store[current] = content;
      return current++;
    }
  };
};

it('should start with no notes', async () => {
  const api = Api();
  const model = await Model(api);

  expect(await model.listNotes()).toEqual([]);
});

it('should allow notes to be created', async () => {
  const api = Api();
  const model = await Model(api);

  const note1 = await model.createNote({ title: 'Note1', contents: 'Contents1' });
  const note2 = await model.createNote({ title: 'Note2', contents: 'Contents2' });

  expect(await model.listNotes()).toEqual([ note1, note2 ]);
  expect(await model.readNote(note1)).toEqual({ title: 'Note1', contents: 'Contents1' });
  expect(await model.readNote(note2)).toEqual({ title: 'Note2', contents: 'Contents2' });
});

it('should allow notes to be deleted', async () => {
  const api = Api();
  const model = await Model(api);

  const note1 = await model.createNote({ title: 'Note1', contents: 'Contents1' });
  const note2 = await model.createNote({ title: 'Note2', contents: 'Contents2' });

  await model.deleteNote(note1);

  expect(await model.listNotes()).toEqual([ note2 ]);
});

it('should allow notes to be updated', async () => {
  const api = Api();
  const model = await Model(api);

  const note = await model.createNote({ title: 'title', contents: 'contents' });
  await model.writeNote(note, { title: 'new title', contents: 'new contents' });

  expect(await model.readNote(note)).toEqual({ title: 'new title', contents: 'new contents' });
});

it('should use a provided key to get an existing manifest', async () => {
  const api = Api();
  let model = await Model(api);

  const note = await model.createNote({ title: 'title', contents: 'contents' });

  model = await Model(api, model.key);

  expect(await model.listNotes()).toEqual([ note ]);
});

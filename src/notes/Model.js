export default async (api, key) => {
  if(key === undefined) {
    key = await api.create({ notes: [] });
  }

  const o = {
    key
  };

  const readManifest = () => api.read(key);

  const writeManifest = (contents) => api.write(key, contents);

  o.listNotes = async () => (await readManifest()).notes;

  o.readNote = (id) => api.read(id);

  o.writeNote = (id, data) => api.write(id, data);

  o.createNote = async (content) => {
    const manifest = await readManifest();
    const noteId = await api.create(content);
    manifest.notes.push(noteId);
    await writeManifest(manifest);
    return noteId;
  };

  o.deleteNote = async (id) => {
    const manifest = await readManifest();
    manifest.notes = manifest.notes.filter((x) => x !== id);
    return await writeManifest(manifest);
  };

  return o;
};

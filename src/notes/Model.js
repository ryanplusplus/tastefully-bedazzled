export default async (api, key) => {
  const o = {
    key
  };

  if(o.key === undefined) {
    o.key = await api.create({
      tastefullyBedazzled: true,
      notes: []
    });
  }

  const readManifest = () => api.read(o.key);

  const writeManifest = (contents) => api.write(o.key, contents);

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

  o.setKey = (key) => o.key = key;

  o.validKey = async (key) => {
    return api.read(key)
      .then((manifest) => manifest.tastefullyBedazzled === true)
      .catch(() => false);
  };

  return o;
};

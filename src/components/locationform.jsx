export default function LocationForm({ getLocation, handleChange }) {
  return (
    <form onSubmit={getLocation} className="LocationForm">
      <label for="LocationInput">Location</label>
      <input onChange={handleChange} type="text" name="LocationInput" />
      <button className="LocationSubmit">Submit</button>
    </form>
  );
}
vercel - 
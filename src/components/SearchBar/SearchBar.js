import TextField from "@mui/material/TextField";
import './SearchBar.css';

const SearchBar = ({
    inputValue
}) => {
    return (
        <div className="main-search">
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputValue}
                    variant="outlined"
                    fullWidth
                    label="What excites you today?"
                    placeholder="Search product by name, description or price..."
                />
            </div>
        </div>
    );
}

export default SearchBar;
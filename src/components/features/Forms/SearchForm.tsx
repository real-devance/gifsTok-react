import { InputField } from '../../ui';
import { SearchButton } from '../../ui/Buttons';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type FormFields = {
  search: string;
};

function SearchForm() {

  const navigate = useNavigate(); 
  const { register, handleSubmit } = useForm<FormFields>(); 

  // Handle form submission
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // If the search input is not empty or just spaces, navigate to the search results page
    if (data.search.trim()) {
      navigate(`/search?query=${encodeURIComponent(data.search.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-[1fr_auto]">
      {/* Search Input Field */}
      <InputField
        type="text"
        placeholder="Search for gifs"
        className="rounded-l-md rounded-r-none outline-none w-full"
        {...register("search")} 
      />
      
      {/* Search Button */}
      <SearchButton className="rounded-r-md p-2" /> 
    </form>
  );
}

export default SearchForm;

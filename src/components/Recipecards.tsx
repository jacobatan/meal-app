import React, { useEffect, useState } from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";

interface food {
  title:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  image: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

interface Props {
  cal: number;
}

const Recipecards: React.FC<Props> = ({ cal }: Props) => {
  const [foods, setFoods] = useState<any>(null);
  function APIHandler() {
    const fetchUrl = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=bec6646e28214a36ac170eebd320225d&maxCalories=${cal}`;
    useEffect(() => {
      async function fetchData() {
        let req = await fetch(fetchUrl);
        let response = await req.json();
        setFoods(response);
      }
      fetchData();
    }, [fetchUrl]);
  }
  APIHandler();
  console.log(foods);

  return (
    <div>
      <FormControl>
        <TextField
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      {foods && (
        <Grid container spacing={2}>
          {foods.map((food: food) => (
            <Grid item xs={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={food.image}
                  alt=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {food.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Calories : {food.calories}cal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fat : {food.fat}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Carbs : {food.carbs}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Protein : {food.protein}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Recipecards;

//bec6646e28214a36ac170eebd320225d

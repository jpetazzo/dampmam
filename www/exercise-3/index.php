<?
$dictionary = json_decode(file_get_contents("words.en.fr.json"), true);
$sourcewords = [];
$targetwords = [];
foreach($dictionary as $word => $translations) {
  array_push($sourcewords, $word);
  $targetwords = array_merge($targetwords, $translations);
}
echo "We have " . count($sourcewords) . " english words, and " . count($targetwords) . " french words.";

shuffle($sourcewords);
$question = $sourcewords[0];
$right_answers = $dictionary[$question];
shuffle($right_answers);
$one_right_answer = $right_answers[0];
shuffle($targetwords);
$other_answer = $targetwords[0];
$answers = [$one_right_answer, $other_answer];
asort($answers);

echo "<p>";
echo "What is the correct translation for " . $question . "?";
echo "<ul>";
foreach($answers as $answer) {
  echo "<li>" . $answer . "</li>";
}
echo "</ul>";
?>

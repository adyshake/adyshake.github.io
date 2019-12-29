---
title: SQL Join
layout: contentbase
---
SQL Join
======

We'll use following tables this example,

`friends` table

| friend_id | friend_name |
|-----------|-------------|
| 1         | John        |
| 2         | Sarah       |
| 3         | Rachel      |
| 4         | Sam         |

`pets` tables

| pet_id | owner_id | pet_type   | pet_name |
|--------|----------|------------|----------|
| 1      | 1        | goldfish   | Fishy    |
| 2      | 1        | goldfish   | Nemo     |
| 3      | 1        | dog        | Fido     |
| 4      | 2        | cat        | Samwise  |
| 5      | 2        | bird       | Feathers |
| 6      | 3        | chinchilla | Fuzzy    |
| 7      | NULL     | iguana     | Scales   |

Here's the SQL to set it up

```sql
CREATE TABLE friends
(
  friend_id INT,
  friend_name VARCHAR(100)
);

CREATE TABLE pets
(
 pet_id INT,
 owner_id INT,
 pet_type VARCHAR(100),
 pet_name VARCHAR(100)
);

INSERT INTO friends values(1, 'John');
INSERT INTO friends values(2, 'Sarah');
INSERT INTO friends values(3, 'Rachel');
INSERT INTO friends values(4, 'Sam');


INSERT INTO pets values(1, 1,    'goldfish',   'Fishy'    );
INSERT INTO pets values(2, 1,    'goldfish',   'Nemo'     );
INSERT INTO pets values(3, 1,    'dog',        'Fido'     );
INSERT INTO pets values(4, 2,    'cat',        'Kitty'    );
INSERT INTO pets values(5, 2,    'bird',       'Feathers' );
INSERT INTO pets values(6, 3,    'chinchilla', 'Fuzzy'    );
INSERT INTO pets values(7, NULL, 'iguana',     'Scales'   );
```

## Inner join

```sql
SELECT * FROM friends
INNER JOIN pets
ON friends.friend_id = pets.owner_id;
```

The inner join will combine the rows from `friends` that match up with at least
one row from `pets`

Here's the output of this join query:

| friend_id | friend_name | pet_id | owner_id | pet_type   | pet_name |
|-----------|-------------|--------|----------|------------|----------|
| 1         | John        | 1      | 1        | goldfish   | Fishy    |
| 1         | John        | 2      | 1        | goldfish   | Nemo     |
| 1         | John        | 3      | 1        | dog        | Fido     |
| 2         | Sarah       | 4      | 2        | cat        | Samwise  |
| 2         | Sarah       | 5      | 2        | bird       | Feathers |
| 3         | Rachel      | 6      | 3        | chinchilla | Fuzzy    |

Few things to note about the results:
 * Scales the iguana is not included in the results. He does not have an owner
   (`owner_id` is `NULL` in the `pets` table), so he was never matched with a
   row in `friends`.
 * Sam(`friend_id` = `4`) is not included in the results because he does not
   have any matches in the `pets` table.

## Implicit Join
Inner joins can be perform with the implicit join syntax. This query will give
you the same results as above:
```
SELECT * FROM friends, pets
WHERE friends.friend_id = pets.owner_id;
```

## Outer Joins

Outer joins can be classified into three types:
* Left outer join: all rows from `friends`, all matching rows from `pets`
* Right outer join: all matching rows from `friends`, all rows from `pets`
* Full outer join: all rows from `friends`, all rows from `pets` regardless of
  whether they match

### Left outer join

```sql
SELECT * FROM friends
LEFT OUTER JOIN pets
ON friends.friend_id = pets.owner_id
```

This left outer join will give you all the rows from `friends`, and will try to
match them with rows from `pets`.

If there is no match with `pets`, the `pet_id`, `owner_id`, `pet_type`, and
`pet_name` columns in the results will be `NULL`.

`pets` with no owner will not be included. (Sorry, Scales the iguana).

Here's the output from this join query:

| friend_id | friend_name | pet_id | owner_id | pet_type   | pet_name |
|-----------|-------------|--------|----------|------------|----------|
| 1         | John        | 1      | 1        | goldfish   | Fishy    |
| 1         | John        | 2      | 1        | goldfish   | Nemo     |
| 1         | John        | 3      | 1        | dog        | Fido     |
| 2         | Sarah       | 4      | 2        | cat        | Samwise  |
| 2         | Sarah       | 5      | 2        | bird       | Feathers |
| 3         | Rachel      | 6      | 3        | chinchilla | Fuzzy    |
| 4         | Sam         | NULL   | NULL     | NULL       | NULL     |

Few things to note about the results:
* `Sam` has `NULL` for his `pet_id`, `owner_id`, `pet_type`, and `pet_name` columns because he does not have a pet.
* Scales the iguana is not included in the table because he has a `NULL` owner.

### Right outer join
```sql
SELECT * from friends
RIGHT OUTER JOIN pets
ON friends.friend_id = pets.owner_id;
```

This query will give you almost the same results as the left outer join. The
only difference is that `pets` with no owners are in the results, and `friends`
with no pets are left out.

Here are the results:

| friend_id | friend_name | pet_id | owner_id | pet_type   | pet_name |
|-----------|-------------|--------|----------|------------|----------|
| 1         | John        | 1      | 1        | goldfish   | Fishy    |
| 1         | John        | 2      | 1        | goldfish   | Nemo     |
| 1         | John        | 3      | 1        | dog        | Fido     |
| 2         | Sarah       | 4      | 2        | cat        | Samwise  |
| 2         | Sarah       | 5      | 2        | bird       | Feathers |
| 3         | Rachel      | 6      | 3        | chinchilla | Fuzzy    |
| NULL      | NULL        | 7      | NULL     | iguana     | Scales   |

Notice how Scales the iguana is in, but Sam is left out.

### Full outer join
These don’t exist in MySQL but do in PostgreSQL and other databases.
If your database does support full outer joins, the syntax should look like this:

```sql
SELECT * FROM friends
FULL OUTER JOIN pets
ON friends.friend_id = pets.owner_id;
```

You can emulate a full outer join in MySQL like this:

```sql
SELECT * FROM friends
LEFT JOIN pets ON friends.friend_id = pets.owner_id
UNION
SELECT * FROM friends
RIGHT JOIN pets ON friends.friend_id = pets.owner_id;
```

Here's what the results what would look like:

| friend_id | friend_name | pet_id | owner_id | pet_type   | pet_name |
|-----------|-------------|--------|----------|------------|----------|
| 1         | John        | 1      | 1        | goldfish   | Fishy    |
| 1         | John        | 2      | 1        | goldfish   | Nemo     |
| 1         | John        | 3      | 1        | dog        | Fido     |
| 2         | Sarah       | 4      | 2        | cat        | Samwise  |
| 2         | Sarah       | 5      | 2        | bird       | Feathers |
| 3         | Rachel      | 6      | 3        | chinchilla | Fuzzy    |
| 4         | Sam         | NULL   | NULL     | NULL       | NULL     |
| NULL      | NULL        | 7      | NULL     | iguana     | Scales   |

Both Sam and Scales the iguana are in the results. In essence, it's a union
between the right and left outer joins.

## Cross join
A cross join is a different from the other types of joins discussed in that
there's no matching between tables. It's forms a cartesian product.

The cross join below will take every row from `friends` and mash it together
with every other row in `pets`. 

```sql
SELECT * FROM friends
CROSS JOIN pets;
```

Implicit cross join syntax:
```sql
SELECT * FROM friends, pets;
```

Here's what that would look like:

| friend_id | friend_name | pet_id | owner_id | pet_type   | pet_name |
|-----------|-------------|--------|----------|------------|----------|
| 1         | John        | 1      | 1        | goldfish   | Fishy    |
| 2         | Sarah       | 1      | 1        | goldfish   | Fishy    |
| 3         | Rachel      | 1      | 1        | goldfish   | Fishy    |
| 4         | Sam         | 1      | 1        | goldfish   | Fishy    |
| 1         | John        | 2      | 1        | goldfish   | Nemo     |
| 2         | Sarah       | 2      | 1        | goldfish   | Nemo     |
| 3         | Rachel      | 2      | 1        | goldfish   | Nemo     |
| 4         | Sam         | 2      | 1        | goldfish   | Nemo     |
| 1         | John        | 3      | 1        | dog        | Fido     |
| 2         | Sarah       | 3      | 1        | dog        | Fido     |
| 3         | Rachel      | 3      | 1        | dog        | Fido     |
| 4         | Sam         | 3      | 1        | dog        | Fido     |
| 1         | John        | 4      | 2        | cat        | Kitty    |
| 2         | Sarah       | 4      | 2        | cat        | Kitty    |
| 3         | Rachel      | 4      | 2        | cat        | Kitty    |
| 4         | Sam         | 4      | 2        | cat        | Kitty    |
| 1         | John        | 5      | 2        | bird       | Feathers |
| 2         | Sarah       | 5      | 2        | bird       | Feathers |
| 3         | Rachel      | 5      | 2        | bird       | Feathers |
| 4         | Sam         | 5      | 2        | bird       | Feathers |
| 1         | John        | 6      | 3        | chinchilla | Fuzzy    |
| 2         | Sarah       | 6      | 3        | chinchilla | Fuzzy    |
| 3         | Rachel      | 6      | 3        | chinchilla | Fuzzy    |
| 4         | Sam         | 6      | 3        | chinchilla | Fuzzy    |
| 1         | John        | 7      | (null)   | iguana     | Scales   |
| 2         | Sarah       | 7      | (null)   | iguana     | Scales   |
| 3         | Rachel      | 7      | (null)   | iguana     | Scales   |
| 4         | Sam         | 7      | (null)   | iguana     | Scales   |